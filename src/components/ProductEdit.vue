<template>
    <router-link :to="`/product/${code}/detail`" class="btn btn-outline-secondary">Back</router-link>
    <div class="row">
        <div class="col-md">
            <h3 class="text-center mb-4">Edit Products</h3>
            <div v-if="message" class="text-danger my-3"> 
                {{ message }} 
            </div>
            <form @submit.prevent="updateProduct">
                <div class="form-group">
                    <label for="code">Code:</label>
                    <input class="form-control" disabled type="text" id="code" v-model.lazy="code">
                </div>
                <div class="form-group">
                    <label for="name">Name: </label>
                    <input class="form-control" type="text" id="name" v-model.lazy="name">
                </div>
                <div class="form-group">
                    <label for="qty">Qty: </label>
                    <input class="form-control" disabled type="number" id="qty" v-model.lazy="qty">
                </div>
                <div class="form-group">
                    <label for="description">Description: </label>
                    <textarea class="form-control"  id="description" rows="6" cols="22" v-model.lazy="description"></textarea>
                </div>
                <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" id="status" v-model.lazy="status">
                    <label for="status" class="form-check-label">Status (Check For Activate) </label>
                </div>
                <button class="btn btn-primary mt-4 w-100">Update Product</button>
            </form>
        </div>
    </div>
</template>
    <script>
    import axios from 'axios';
    import { useRoute } from "vue-router"

    export default {
        name: "Product",
        data(){
            return{
                name: '',
                code: '',
                qty: 0,
                description: '',
                status: false,
                route : '',
                message: null,
            }
        },
        methods: {
            getProduct(){
                this.route = useRoute()
                axios
                .get(import.meta.env.VITE_BASE_URL + `/products/${this.route.params.code}`)
                .then((response) => {
                    this.name = response.data.product.Nama
                    this.code = response.data.product.Code
                    this.qty = response.data.product.Jumlah
                    this.description = response.data.product.Deskripsi
                    this.status = response.data.product.Status_active
                    this.notes = response.data.product.Notes
                })
            },
            updateProduct(){
                let formData = new FormData()
                formData.append('code', this.code)
                formData.append('name', this.name)
                formData.append('qty', this.qty)
                formData.append('description', this.description)
                formData.append('status', this.status)
                axios
                    .put(import.meta.env.VITE_BASE_URL + `/products/${this.route.params.code}`, formData)
                    .then((response) => {
                        this.message = response.data.message
                        console.log(this.message)
                        this.$router.push({ name: 'product-detail', params: {code: this.code} })
                    })
            }
        },
        mounted () {
            this.getProduct()
        }
};
</script>