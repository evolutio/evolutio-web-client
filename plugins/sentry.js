import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

export default ({ app }) => {
  if (process.env.NODE_ENV !== 'production') return
  Raven.config('https://94184659d4df487f9a38502722a6335f@sentry.io/214074').install();
}