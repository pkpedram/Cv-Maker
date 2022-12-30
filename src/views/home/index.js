import React from 'react'
import Button from '../../components/Button'
import Layout from '../../layout'
import logo from '../../logo.svg'

const HomePage = () => {
  return (
   <Layout className={'flex items-center justify-center'}>
        <div className=' p-10 rounded-xl shadow-xl bg-blue47 flex flex-col items-center'>
            <img src={logo} className="w-72 animate-spin" />
            <h1 className='text-blueB3 drop-shadow text-5xl mt-4'>
                REACT CV-MAKER
            </h1>

            <div className='w-full flex items-center justify-center mt-8'>
                <Button className={'m-1'} to="/new-cv">
                    New CV
                </Button>
                <Button className={'m-1'} layout="border" to='my-resumes'>
                    My resumes
                </Button>
            </div>  
        </div>
   </Layout>
  )
}

export default HomePage