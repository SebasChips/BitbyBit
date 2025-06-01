import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from "../firebase/firebaseConfig";

export const lessonComplete = async (currentLesson, newLesson) => {
    try {
      const lessonId = currentLesson;
      const userId = auth.currentUser?.uid;
      if (!userId) return;
      
      const lessonProgressRef = doc(db, 'users', userId, 'lessonsProgress', lessonId);
      const lessonSnap = await getDoc(lessonProgressRef);
      const alreadyCompleted = lessonSnap.exists() ? lessonSnap.data().completed : false;

      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;
      
      const userData = userSnap.data();
      const currentXp = userData.xp || 0;
      const xpEarned = alreadyCompleted ? 500 : 1000;

      const updates = {
        xp: currentXp + xpEarned
      };

      if (!alreadyCompleted) {
        await updateDoc(lessonProgressRef, { completed: true });

        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const lastActivity = userData.lastActivity || null;
        const currentStreak = userData.streak || 0;

        let newStreak = 1;
        if (lastActivity) {
          const lastDate = new Date(lastActivity);
          const diffTime = today.getTime() - lastDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) newStreak = currentStreak + 1;
          else if (diffDays === 0) newStreak = currentStreak;
        }

        updates.streak = newStreak;
        updates.lastActivity = todayStr;

        if(newLesson){
            const lesson2Ref = doc(db, 'users', userId, 'lessonsProgress', newLesson);
            const lesson2Snap = await getDoc(lesson2Ref);      
            if (!lesson2Snap.exists()) {
            await setDoc(lesson2Ref, {
                attempts: 0,
                completed: false,
                levelLesson: 2,
                score: 0
            });
            }
        }
      }

      await updateDoc(userRef, updates);

      return xpEarned

    } catch (error) {
      console.error("Error al actualizar progreso o XP:", error);
    }
  };
