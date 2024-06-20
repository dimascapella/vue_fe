<template>
    <div>
        {{products}}
    </div>

</template>
    <script>
    import axios from 'axios';

    export default {
        name: "ProductList",
        data(){
            return{
                products: null
            }
        },
        mounted () {
            axios
            .get(import.meta.env.VITE_BASE_URL + '/products')
            .then(response => (this.products = response.data.products))
        }
};
</script>