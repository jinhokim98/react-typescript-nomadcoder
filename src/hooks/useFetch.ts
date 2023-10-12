import { useEffect, useState } from 'react'

// 문제점: 페이지를 다시 접속할 때마다 다시 fetch 해줘야 한다.
function useFetch<T>(uri: string) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(uri)
      const json = await response.json()
      setData(json)
      setLoading(false)
    }

    fetchData()
  }, [uri])

  return { data, loading }
}

export default useFetch
