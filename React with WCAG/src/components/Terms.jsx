import {React} from 'react';
import Navbar from './Navbar'
import './Terms.css';

function Terms(props) {
  let buttonText = `Go to ${props.indexing === 'normal' ? 'home' : 'normal terms'} page`;

  function onGoBackClick() {
    props.indexing === 'normal' ? document.location.href = "/" : document.location.href = "/terms";
  }

  return (
    <div>
      <Navbar />
      <div className='termsFlex'>
        {props.indexing === 'extended' && <a href="#extendedSection">Go to extended section</a>}
        <button className='termsButton' alt={buttonText} onClick={onGoBackClick}>{buttonText}</button>
      </div>
      <div className='termsText'>
        <title>Terms and Conditions</title>
        <p>Please read these <abbr title="Terms and Conditions">T&C</abbr> carefully before using Our Service.</p>
        <section>
          <h2>Definitions</h2>
          <p>For the purposes of these T&C:</p>
          <dl>
            <dt>Company (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement)</dt>
            <dd>Refers to Shop Company with headquarter in Warszawa [varˈʂava].</dd>
            <dt>Service</dt>
            <dd>Refers to the website.</dd>
            <dt>You</dt>
            <dd>Means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</dd>
          </dl>
        </section>
        <section>
          <h1>Acknowledgment</h1>
          <p>These are the T&C governing the use of this Service and the agreement that operates between You and the Company. These T&C set out the rights and obligations of all users regarding the use of the Service.</p>
          <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these T&C. These T&C apply to all visitors, users and others who access or use the Service.</p>
          <p>By accessing or using the Service You agree to be bound by these T&C. If You disagree with any part of these T&C then You may not access the Service.</p>
          <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
          <p>We reserve right to change Your username if it contains vulgar word or onomatopoeia.</p>
        </section>
        <section>
          <h1>Termination</h1>
          <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
          <p>Upon termination, Your right to use the Service will cease immediately.</p>
          <h1>Changes to These T&C</h1>
          <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
          <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.</p>
        </section>
        <section lang="pl">
          <h1>Informacje polskojęzyczne</h1>
          <p>Powyższy regulamin dotyczy wszystkich klientów serwisu, niezależnie od miejsca korzystania z niego.</p>
          <p>Korzystający z serwisu <dfn title="maturzyści">abiturienci</dfn> upoważnieni są do 10% zniżki na wszystkie zakupy.</p>
        </section>
      </div>
      <div className='termsFlex'>
        <button className='termsButton' alt={buttonText} onClick={onGoBackClick}>{buttonText}</button>
      </div>
      <br />
      {props.indexing === 'normal' && <a href="/termsx">See extended T&C</a>}
    </div>
  );
}

export default Terms;