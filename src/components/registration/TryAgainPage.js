import React from 'react'

export default function TryAgainPage() {

    return (
        <div className='taContainer'>
            <div className='taContentCard'>
                <div className='taContentCardLeft'>
                <img src='https://www.villagebookbuilders.org/wp-content/uploads/2020/04/Peru-Border-01-2-768x771.png'
                style={{maxHeight:'100%'}}
                alt='kidsreading2.png'
                />
                </div>
                <div className='taContentCardRigth'>
                <h1>Sorry! It looks like something went wrong....</h1>
                <h6>Please close these window and click donate again or
                go to <br/>
                <a
                style={{textDecoration:'none', color:'black'}}
                href='https://www.villagebookbuilders.org/donate/'>
                  https://www.villagebookbuilders.org/donate/ </a>
                to donate through our home page.
                </h6>
                <h6>
                If you have any questions, concerns, or comments, please reach out to us at mentor@villagebookbuilders.org
                </h6>
                <p>You can close this window now</p>
                </div>
            </div>
        </div>
    )
}
