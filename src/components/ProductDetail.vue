<template>
    <router-link :to="{name: 'index'}" class="btn btn-outline-primary my-2">Home</router-link>
    <div class="card">
        <div class="card-body">
            <h3>Product Detail</h3>
            <dl>
                <dt>Status</dt>
                <dd v-if="status"><span class="badge rounded-pill bg-success">Active</span></dd>
                <dd v-else><span class="badge rounded-pill bg-secondary">Non-Active</span></dd>
                <dt>Name</dt>
                <dd>{{ name }}</dd>
                <dt>Code</dt>
                <dd>{{ code }}</dd>
                <dt>Qty</dt>
                <dd>{{ qty }}</dd>
                <dt>Description</dt>
                <dd>{{ description }}</dd>
            </dl>
            <div class="row">
                <div class="col-md-1">
                    <router-link :to="`/product/${code}/edit`" class="text-primary">Edit</router-link>
                </div>
                <div class="col-md-1">
                    <a href="#" class="text-danger" v-on:click="deleteProduct()">Delete</a>
                </div>
            </div>
        </div>
    </div>
    <div class="card mt-4">
        <div class="card-body">
            <h4>List of Product History</h4>
            <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Note</th>
                        <th scope="col">Qty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(note, index) in notes" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ name }} - {{ code }}</td>
                        <td>{{ note.Note }}</td>
                        <td>{{ note.Qty }}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
    <script>
    import axios from 'axios';
    import { useRoute } from "vue-router"

    export default {
        name: "ProductDetail",
        data(){
            return{
                name: '',
                code: '',
                qty: 0,
                description: '',
                status: false,
                notes: [],
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
            deleteProduct(){
                axios
                .delete(import.meta.env.VITE_BASE_URL + `/products/${this.route.params.code}`)
                .then(() => {
                    this.$router.push({ path: '/' })
                })
            }
        },
        mounted () {
            this.getProduct()
        }
};
</script>