<template>
<div>
  <div class='termsFlex'>
    <a v-if="indexing == 'extended'" href="#extendedSection">Go to extended section</a>
    <button class='termsButton' @click="onGoBackClick" alt="{{buttonText}}">{{buttonText}}</button>
  </div>
  <div class='termsText'>
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
  <div class='termsFlex'>
    <button class='termsButton' alt="{{buttonText}}" @click="onGoBackClick">{{buttonText}}</button>
  </div>
  <br />
  <a v-if="indexing != 'extended'" href="/termsx">See extended T&C</a>
</div>
</template>

<script>

export default {
  name: 'TermsComponent',
  props: {
    indexing: String
  },

  data() {
    return { buttonText: `Go to ${this.indexing == 'normal' ? 'home' : 'normal terms'} page` }
  },

  methods: {
    onGoBackClick() {
      this.indexing == 'normal' ? document.location.href = "/" : document.location.href = "/terms";
      history.back();
    },

    scrollToExtended() {
      this.scroller.scrollToAnchor("extendedSection");
    }
  }
}
</script>

<style scoped>
.termsButton {
    color: #FFFFFF;
    background-color:#000000;
}

.termsButton:hover {
    background-color: #545454;
}

.termsFlex {
    display: flex;
    flex-direction: column;
}

.termsText {
    line-height: 100%;
    height: auto;
}
</style>
