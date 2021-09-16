import React from 'react'

export default function ThankYouPage() {
    return (
        <div className='tpContainer'>
            <div className='tpContentCard'>
                <div className='tpContentCardLeft'>
                <img src='https://www.villagebookbuilders.org/wp-content/uploads/2020/04/Mexico-Border-01-1-768x771.png'
                style={{maxHeight:'100%'}}
                alt='kidsreading.png'/>
                </div>
                <div className='tpContentCardRigth'>
                <h1>Thank you so much for donating!</h1>
                {/* <h2></h2> */}
                <p>
                ... and, of course, thank you for choosing to be a mentor!
                <br/><br/>
                Our mission is to bring books, computers, and reliable internet to children 
                living in rural underserved communities all over the world, and we can't achieve
                 that vision without you. 
                 <br/><br/>
                 (You can close this tab now)</p>
                </div>
            </div>
        </div>
    )
}
