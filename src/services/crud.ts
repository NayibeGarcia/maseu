import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/firebase'

export interface QuoteType {
  id?: string
  userId: string
  name: string
  userEmail: string
  servicio: string
  quoteDate: Date
  answerDate: Date | null
  requestContent: string
  requestAnswer?: string
  state: string
  quotePrice: string
  cupon: string
  hasImage?: boolean
}

export interface QuoteFireType {
  id?: string
  userId: string
  name: string
  userEmail: string
  servicio: string
  quoteDate: { seconds: number }
  answerDate: { seconds: number } | null
  requestContent: string
  requestAnswer?: string
  state: string
  quotePrice: string
  cupon: string
  hasImage: boolean
}

const UpLoadImage = async (file: File, id: string) => {
  const storageRef = ref(storage, `quotes/${id}`)

  try {
    await uploadBytes(storageRef, file)
  } catch (error) {
    console.error('Error al cargar la imagen', error)
  }
}

export const saveData = async (quote: QuoteType, file?: File | null) => {
  try {
    const docRef = await addDoc(collection(db, 'quote'), {
      ...quote,
      hasImage: !!file,
    })
    file && UpLoadImage(file, docRef.id)
    await fetch('/api/send/new', {
      method: 'POST',
      body: JSON.stringify({ name: quote.name, email: quote.userEmail }),
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getQuoteByUser = async (
  email: string
): Promise<QuoteFireType[]> => {
  try {
    const q = query(collection(db, 'quote'), where('userEmail', '==', email))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as QuoteFireType)
    )

    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}

export const getAllQuotes = async (
  email?: string
): Promise<QuoteFireType[]> => {
  try {
    const regex = new RegExp(email ?? '', 'i')
    const q = query(collection(db, 'quote'))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs
      .filter((doc) => regex.test(doc.data().userEmail))
      .map((doc) => ({ id: doc.id, ...doc.data() } as QuoteFireType))
    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}

// Update Document

export const updateDocument = async (
  documentId: string,
  newData: Partial<QuoteType>,
  name: string,
  userEmail: string
) => {
  try {
    const docRef = doc(db, 'quote', documentId) // Replace 'your_collection_name' with your actual collection name

    // Update the document with the new data
    await updateDoc(docRef, newData)

    await fetch('/api/send/update', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: userEmail,
        answer: newData.requestAnswer,
        price: newData.quotePrice,
      }),
    })

    console.info('Document updated successfully!')
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}
