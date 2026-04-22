import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://combo_redis:6379'
});

redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

(async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('🚀 Connected to Redis');
        }
    } catch (err) {
        console.error('❌ Redis Connection Failed:', err);
    }
})();

export const loadSlotsToRedis = async (slots: any[]) => {
    try {
        if (!redisClient.isOpen) await redisClient.connect();
        for (const slot of slots) {
            await redisClient.set(`slot:${slot.id}:capacity`, slot.max_capacity.toString());
        }
        console.log('✅ Redis updated with training slots');
    } catch (error) {
        console.error('❌ Αποτυχία συγχρονισμού Redis:', error);
    }
};

/**
 * Μείωση θέσης στο Redis
 * Επιστρέφει success (αν έγινε η κράτηση) και remaining (πόσες θέσεις έμειναν)
 */
export const bookSlotInRedis = async (slotId: number): Promise<{ success: boolean; remaining: number }> => {
    try {
        if (!redisClient.isOpen) await redisClient.connect();
        
        const key = `slot:${slotId}:capacity`;
        const remaining = await redisClient.decr(key);
        
        if (remaining < 0) {
            await redisClient.incr(key); // Επαναφορά αν ήταν ήδη 0
            return { success: false, remaining: 0 };
        }
        
        return { success: true, remaining };
    } catch (error) {
        console.error('❌ Redis Booking Error:', error);
        return { success: false, remaining: 0 };
    }
};

export default redisClient;