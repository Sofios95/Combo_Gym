import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL
});

// 1. Έλεγχος Ασφαλείας - Fail Fast
if (!process.env.REDIS_URL) {
    throw new Error('❌ FATAL ERROR: REDIS_URL is missing from environment variables!');
}

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('🚀 Connected to Redis successfully');
        }
    } catch (err) {
        console.error('❌ Redis Connection Failed:', err);
    }
})();

/**
 * Φορτώνει τα slots στη Redis υπολογίζοντας ΜΟΝΟ τις πραγματικές διαθέσιμες θέσεις
 */
export const loadSlotsToRedis = async (slots: any[]) => {
    try {
        if (!redisClient.isOpen) await redisClient.connect();
        
        for (const slot of slots) {
            // ΔΙΟΡΘΩΣΗ BUG: max_capacity ΜΕΙΟΝ τις κρατήσεις που έχουν ήδη γίνει
            const remainingCapacity = slot.max_capacity - (slot.booked_count || 0);
            
            await redisClient.set(
                `slot:${slot.id}:capacity`, 
                remainingCapacity.toString()
            );
        }
        console.log('✅ Redis updated with exact remaining training slots');
    } catch (error) {
        console.error('❌ Αποτυχία συγχρονισμού Redis:', error);
    }
};

/**
 * Μείωση θέσης στο Redis με Atomic DECR (Race Condition Protection)
 */
export const bookSlotInRedis = async (slotId: number): Promise<{ success: boolean; remaining: number }> => {
    try {
        if (!redisClient.isOpen) await redisClient.connect();
        
        const key = `slot:${slotId}:capacity`;
        const remaining = await redisClient.decr(key);
        
        if (remaining < 0) {
            await redisClient.incr(key); // Rollback αν η θέση ήταν ήδη 0
            return { success: false, remaining: 0 };
        }
        
        return { success: true, remaining };
    } catch (error) {
        console.error('❌ Redis Booking Error:', error);
        return { success: false, remaining: 0 };
    }
};

export default redisClient;