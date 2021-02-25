import './App.css';

function Footer() {
    return (
        <div className='footerContainer'>
            <div className='footerContent'>
                <div className='footerLeft'>
                    <h1>Inquilino Perfecto</h1>
                    <div className='footerLinks'>
                        <div className='footerLinks1'>
                            <a href='/'><div className='footerLink facebookFooter' /></a>
                            <a href='/'><div className='footerLink youtubeFooter' /></a>
                            <a href='/'><div className='footerLink instagramFooter' /></a>
                        </div>
                        <div className='footerLinks2'>
                            <a href='/'><div className='footerLink twitterFooter' /></a>
                            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/andr%C3%A9s-sierra-cardalda-09a8b655/'><div className='footerLink linkedinFooter' /></a>
                            <a target='_blank' rel="noreferrer" href='https://github.com/An3SC'><div className='footerLink githubFooter' /></a>
                        </div>
                    </div>
                </div>
                <div className='footerRight'>
                    <div>
                        Esta web ha sido creada como proyecto final para el
                        el bootcamp de programación FULL-STACK de Hack a Boss
                        en estrecha colaboración con <a target='_blank' rel="noreferrer" href='https://github.com/kanarikus'>Antonio Pires Abad</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer