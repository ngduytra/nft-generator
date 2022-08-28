// import { useCallback, useEffect, useState } from 'react'
// import { rpc } from '@sentre/senhub'

// import { NotifySubscription } from 'lib/notification'

// export const useNotification = () => {
//   const [notification, setNotification] = useState<NotifySubscription>()
//   const initializeNotification = useCallback(async () => {
//     const newNotification = await NotifySubscription.initializeSubscription(rpc)
//     setNotification(newNotification)
//   }, [])

//   useEffect(() => {
//     initializeNotification()
//   }, [initializeNotification])

//   return notification
// }
