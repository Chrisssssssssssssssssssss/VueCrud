<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">View Contact</p>
                <p class="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies imperdiet urna nec lobortis. Nam tempus enim enim, a posuere libero finibus auctor. Cras facilisis luctus mi ac viverra. Vivamus tempor lobortis gravida. Suspendisse potenti. Cras dictum elit tortor, vitae blandit lorem blandit et. Etiam ut nisi eu velit mattis auctor non ut libero. In hac habitasse platea dictumst.</p>
            </div>
        </div>
    </div>

    <!-- Spinner -->
    <div v-if="loading">
        <div class="container mt-4">
            <div class="row">
                <div class="col">
                    <MySpinner/>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Message -->
    <div v-if="!loading && errorMessage">
        <div class="container">
            <div class="row">
                <div class="col">
                    <p class="h3 text-danger">{{ errorMessage }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container" v-if="!loading && isDone()">
        <div class="row">
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img">
            </div>
            <div class="col-md-6">
                <ul class="list-group">
                    <li class="list-group-item">Name: <span class="fw-bold"> {{ contact.name }}</span></li>
                    <li class="list-group-item mt-1">Email: <span class="fw-bold"> {{ contact.email }}</span></li>
                    <li class="list-group-item  mt-1">Mobile: <span class="fw-bold"> {{ contact.mobile }}</span></li>
                    <li class="list-group-item mt-1">Company: <span class="fw-bold"> {{ contact.company }}</span></li>
                    <li class="list-group-item mt-1">Title: <span class="fw-bold"> {{ contact.title }}</span></li>
                    <li class="list-group-item mt-1">Group: <span class="fw-bold"> {{ group.name }}</span></li>
                </ul>
            </div>            
        </div>
        <div class="row mt-3">
            <div class="col">
                <router-link to="/" class="btn btn-success"><i class="fa-solid fa-arrow-left"></i> Back</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService'
import MySpinner from '@/components/MySpinner.vue';
    export default {
        name:"ViewContact",
        components: {MySpinner},
        data(){
            return{
                contactId:  this.$route.params.contactId,
                loading: false,
                contact: {},
                errorMessage: null,
                group:{}
            }
        },
        async created(){
            try{
                this.loading = true;
                let response = await ContactService.getContact(this.contactId);
                let groupResponse = await ContactService.getGroup(response.data);
                this.contact = response.data;
                this.group = groupResponse.data;
                this.loading = false;
            }catch(error){
                this.errorMessage = error;
                this.loading = false;
            }
        },
        methods:{
            isDone(){
                return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>