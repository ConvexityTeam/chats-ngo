const axios = require('axios');
import countries from '~/plugins/countries'
import { mapActions } from 'vuex';
export default {
    data() {
        return {

            alphaCode: '',
            currencySymbol: '',
            currencyCode: ''

        };
    },
    methods: {
        ...mapActions('authentication', ['locateUser']),
        getIp() {
            axios.get('http://ip-api.com/json')
                .then((response) => {
                    console.log({ response: response.data.countryCode })
                    this.alphaCode = response.data.countryCode
                    this.setCurrency();
                    store.commit('authentication/setUserLocation', this.location)
                        //      this.convertCurrency()
                        // this.locateUser(this.location)

                })
                .catch((err) => {
                    console.log(err)
                })
        },

        setCurrency() {
            // let countries = countries
            console.log({ countries: countries })

            const userCountry = countries.filter(countries => countries.alpha2Code == this.alphaCode)

            console.log('user country', userCountry[0].currencies[0].symbol)
            this.currencySymbol = userCountry[0].currencies[0].symbol
            this.currencyCode = userCountry[0].currencies[0].code



        },
    }
};