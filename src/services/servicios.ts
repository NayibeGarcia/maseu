import { collection, query, getDocs, addDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'

export interface ServicesType {
  title: string
  description: string
  image: string
}

export const saveServices = async () => {
  try {
    await addDoc(collection(db, 'services'), {
      title: 'Linea de aguas',
      description:
        'Nuestro serivicio se encuentra direccionado en la extracción, conducción, elevación y tratamiento de aguas:',
      image: 'https://swiperjs.com/demos/images/nature-3.jpg',
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getAllServices = async (): Promise<ServicesType[]> => {
  try {
    const q = query(collection(db, 'services'))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs.map(
      (doc) => doc.data() as ServicesType
    )

    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}

export const getAllServicesTop = async (): Promise<ServicesType[]> => {
  try {
    const q = query(collection(db, 'services'), where("top", "==", true))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs.map(
      (doc) => doc.data() as ServicesType
    )

    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}
