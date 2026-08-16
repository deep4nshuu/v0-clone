import React from 'react'

const Page = async({params}) => {

    const {projectId} = await params;

  return <div>Page</div>
}

export default Page

