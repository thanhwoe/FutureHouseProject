import React, {useEffect} from 'react';
import { Button, Card, Container, Icon, Image, Segment, Loader, Dimmer, Message, Grid, Label, Item, Header, Form, Divider, Select, Tab } from 'semantic-ui-react'
import img from '../../image/up-arrow.png'

const PrivacyPolicy = () => {
    useEffect(() => {
        handleClick()
    }, []);
    const handleClick = ()=>{
        window.scrollTo(0, 0)
    }
    return (
        <React.Fragment>
            <Container style={{ marginTop: '50px' }}>
                <Header textAlign='center' as='h1'>Future House Privacy Policy</Header>
                <p>1. WHEN WILL FUTURE HOUSE COLLECT PERSONAL DATA? </p>
                <p>when you register and/or use our Services or Platform, or open an account with us</p>
                <p>when you submit any form, including, but not limited to, application forms or other forms relating to any of our products and services, whether online or by way of a physical form</p>
                <p>when you enter into any agreement or provide other documentation or information in respect of your interactions with us, or when you use our products and services</p>
                <p>when you use our electronic services, or interact with us via our application or use services on our Platform. This includes, without limitation, through cookies which we may deploy when you interact with our application or website</p>
                <p>when you submit your personal data to us for any reason</p>
                <p>2. WHAT PERSONAL DATA WILL FUTURE HOUSE COLLECT?</p>
                <p>name, email address, billing</p>
                <p>bank account and payment information</p>
                <p>information sent by or associated with the device(s) used to access our Services or Platform</p>
                <p>usage and transaction data, including details about your searches, orders, the advertising and content you interact with on the Platform, and other products and services related to you;</p>
                <p>3. COLLECTION OF OTHER DATA</p>
                <p>As with most websites and mobile applications, your device sends information which may include data about you that gets logged by a web server when you browse our Platform. This typically includes without limitation your device’s Internet Protocol (IP) address, computer/mobile device operating system and browser type, type of mobile device, the characteristics of the mobile device, the unique device identifier (UDID) or mobile equipment identifier (MEID) for your mobile device, the address of a referring web site (if any), the pages you visit on our website and mobile applications and the times of visit, and sometimes a "cookie" (which can be disabled using your browser preferences) to help the site remember your last visit. If you are logged in, this information is associated with your personal account. The information is also included in anonymous statistics to allow us to understand how visitors use our site.
                    Our mobile applications may collect precise information about the location of your mobile device using technologies such as GPS, Wi-Fi, etc. We collect, use, disclose and/or process this information for one or more Purposes including, without limitation, location-based services that you request or to deliver relevant content to you based on your location or to allow you to share your location to other Users as part of the services under our mobile applications. For most mobile devices, you are able to withdraw your permission for us to acquire this information on your location through your device settings. If you have questions about how to disable your mobile device's location services, please contact your mobile device service provider or the device manufacturer.
                    As when you view pages on our website or mobile application, when you watch content and advertising and access other software on our Platform or through the Services, most of the same information is sent to us (including, without limitation, IP Address, operating system, etc.); but, instead of page views, your device sends us information on the content, advertisement viewed and/or software installed by the Services and the Platform and time.</p>
                <p>4. COOKIES</p>
                <p>We or our authorized service providers and advertising partners may from time to time use "cookies" or other features to allow us or third parties to collect or share information in connection with your use of our Services or Platform. These features help us improve our Platform and the Services we offer, help us offer new services and features, and/or enable us and our advertising partners serve more relevant content to you, including through remarketing. “Cookies” are identifiers that are stored on your computer or mobile device that record data about computer or device, how and when the Services or Platform are used or visited, by how many people and other activity within our Platform. We may link cookie information to personal data. Cookies also link to information regarding what items you have selected for purchase and web pages you have viewed. This information is used to keep track of your shopping cart, to deliver content specific to your interests, to enable our third party advertising partners to serve advertisements on sites across the internet, and to conduct data analysis and to monitor usage of the Services.
                    You may refuse the use of cookies by selecting the appropriate settings on your browser or device. However, please note that if you do this you may not be able to use the full functionality of our Platform or the Services.</p>
                <p>5. HOW DO WE USE THE INFORMATION YOU PROVIDE US?</p>
                <p>You acknowledge, consent and agree that Shopee may access, preserve and disclose your Account information and Content if required to do so by law or pursuant to an order of a court or by any governmental or regulatory authority having jurisdiction over Shopee or in a good faith belief that such access preservation or disclosure is reasonably necessary to: (a) comply with legal process; (b) comply with a request from any governmental or regulatory authority having jurisdiction over Shopee; (c) enforce the Shopee Terms of Service or this Privacy Policy; (d) respond to any threatened or actual claims asserted against Shopee or other claim that any Content violates the rights of third parties; (e) respond to your requests for customer service; or (f) protect the rights, property or personal safety of Shopee, its users and/or the public.
                    As the purposes for which we will/may collect, use, disclose or process your personal data depend on the circumstances at hand, such purpose may not appear above. However, we will notify you of such other purpose at the time of obtaining your consent, unless processing of the applicable data without your consent is permitted by the Privacy Laws.</p>
            </Container>
            <div className='back-top-btn' onClick={handleClick}>
                <Image src={img} size='mini'/>
            </div>

        </React.Fragment>

    );
}

export default PrivacyPolicy;

