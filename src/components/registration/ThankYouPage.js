import React from 'react'

export default function ThankYouPage() {

    return (
        <div className='tpContainer'>
            <div className='tpContentCard'>
                <div className='tpContentCardLeft'>
                <img src='https://www.villagebookbuilders.org/wp-content/uploads/2020/04/Mexico-Border-01-1-768x771.png'
                style={{maxHeight:'95%', maxWidth:'95%'}}
                />
                </div>
                <div className='tpContentCardRigth'>
                <h1>Thank you so much for donating!....</h1>
                <h6>And, thank you for choosing to be a mentor!<br/>
                Our mission is to bring books, computers, and reliable internet to children living in rural undeserved communities all over the world, and we can't achieve that vision without you.
                </h6>
                <br/><br/><p>You can close this window now</p>
                </div>
            </div>
        </div>
    )
}
