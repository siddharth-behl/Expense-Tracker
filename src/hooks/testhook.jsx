import React, { useState } from 'react'

export default function testhook() {
    const [test, settest] = useState(0)
  return [test, settest]
}
