import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
    uri: 'http://laravello.test/graphql',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    },
    credentials: 'include',
    onError: (err) => console.log('Global error handler!')
})

export default new VueApollo({
    defaultClient: apolloClient
});