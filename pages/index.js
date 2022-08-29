import Image from 'next/image'
import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import Head from 'next/head'

export default function Home() {
  const [userInput, setUserInput] = useState({
    url: '',
    size: '300x300',
    format: 'png',
    color: 'ffffff',
  })

  const [src, setSrc] = useState('')
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const submitHandler = (e) => {
    e.preventDefault()

    setSrc(
      'https://api.qrserver.com/v1/create-qr-code/?data=' +
        userInput.url +
        '&size=' +
        userInput.size +
        '&format=' +
        userInput.format +
        '&bgcolor=' +
        userInput.color
    )
  }

  const saveFile = () => {
    saveAs(src, `qrcode.${userInput.format}`)
  }
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [])
  return (
    <>
      <Head>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1133210925380387'
          crossOrigin='anonymous'
        ></script>
        <title>LINK2QR</title>
        <meta
          name='description'
          content='Free link to QR code online converter!'
        />
        <meta property='og:title' content='Link to QR Code online converter' />
        <meta
          property='og:description'
          content='Free link to QR code online converter!'
        />
        <meta property='og:url' content='https://myclothingstore.com/' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/qrcode.png' />
      </Head>
      <div className='pb-24'>
        <nav className='w-full max-w-screen h-20 bg-black text-white font-semibold text-3xl flex items-center justify-start px-12'>
          <p>LINK2QR</p>
        </nav>
        <form
          onSubmit={submitHandler}
          className='max-w-3xl border-x mx-auto  h-screen flex flex-col pt-12 items-center px-10'
        >
          <h1 className='text-3xl font-semibold pb-12 pt-12'>
            Convert your link or text to a QR-code
          </h1>
          <input
            className='w-full p-4  rounded-lg border-2 border-black'
            type='text'
            placeholder='Enter your URL here'
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, url: e.target.value.trim }))
            }
          />
          <div className='w-full flex flex-col items-center mt-12'>
            <div className='w-full '>
              <select
                name='format'
                defaultValue='png'
                className='p-4 mb-6 border-2 border-black rounded-lg bg-white w-full'
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, format: e.target.value }))
                }
              >
                <option value='png'>png</option>
                <option value='gif'>gif</option>
                <option value='jpeg'>jpeg</option>
                <option value='jpg'>jpg</option>
                <option value='svg'>svg</option>
                <option value='evs'>evs</option>
              </select>
              <div className='border-2  border-black rounded-lg mb-6'>
                {domLoaded && (
                  <input
                    name='color'
                    placeholder='Select background color'
                    className='w-full px-2 bg-white  h-14 rounded-lg'
                    type='color'
                    value={`#${userInput.color}`}
                    onChange={(e) => {
                      setUserInput((prev) => ({
                        ...prev,
                        color: e.target.value.split('#')[1],
                      }))
                    }}
                  />
                )}
                <label htmlFor='color' className='px-2  '>
                  Select background color
                </label>
              </div>
              <select
                name='size'
                defaultValue='300x300'
                className='p-4  border-2 border-black rounded-lg bg-white w-full'
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, size: e.target.value }))
                }
              >
                <option value='50x50'>50x50</option>
                <option value='100x100'>100x100</option>
                <option value='200x200'>200x200</option>
                <option value='300x300'>300x300</option>
                <option value='400x400'>400x400</option>
                <option value='500x500'>500x500</option>
              </select>
            </div>
          </div>
          <button className='bg-black mt-12 w-full lg:w-fit text-xl  border-2 rounded-lg border-black text-white hover:text-black hover:bg-white transition p-4 '>
            Convert to QR Code
          </button>

          {/* result */}
          <div className='border-t mt-24 px-12 pt-12 flex flex-col items-center justify-center pb-20'>
            {userInput.url ? (
              <div>
                <Image
                  priority
                  src={src}
                  alt={src}
                  height={`${userInput.size.split('x')[0]}px`}
                  width={`${userInput.size.split('x')[1]}px`}
                />
                <button
                  onClick={saveFile}
                  className='bg-black mt-12 w-full  text-xl  border-2 rounded-lg border-black text-white hover:text-black hover:bg-white transition py-2 uppercase'
                >
                  Download
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
