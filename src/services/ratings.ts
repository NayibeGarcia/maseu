import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/firebase'

export interface RatingType {
  id?: string
  email?: string
  name: string
  rating: number
  text: string
  show: boolean
  photoUrl: string
}

export const saveRating = async (rating: RatingType) => {
  try {
    await addDoc(collection(db, 'ratings'), rating)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getRatingByEmail = async (
  email: string | null | undefined
): Promise<RatingType> => {
  try {
    const q = query(collection(db, 'ratings'), where('email', '==', email))

    const ratingSnapshot = await getDocs(q)

    const ratingData = ratingSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as RatingType)
    )[0]

    return ratingData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}

export const getAllRatings = async (show = false): Promise<RatingType[]> => {
  try {
    const q = show
      ? query(collection(db, 'ratings'), where('show', '==', true))
      : query(collection(db, 'ratings'))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as RatingType)
    )

    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}

// Update Document

export const updateRating = async (
  documentId: string,
  newData: Partial<RatingType>
) => {
  try {
    const docRef = doc(db, 'ratings', documentId) // Replace 'your_collection_name' with your actual collection name

    // Update the document with the new data
    await updateDoc(docRef, newData)

    console.info('Document updated successfully!')
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}
