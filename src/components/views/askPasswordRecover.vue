<template>
    <section id="loginSection" class="sectionMarco">
        <div class="container marco align-items-center">
            <div class="card mt-5">
                <div class="row no-gutters">
                    <div class="col-md-5">
                        <img src="../../assets/img/login.jpg" class="card-img" />
                    </div>
                </div>

                <div class="col">
                    <p class="card-description mt-5 mb-5">Recuperar Contraseña</p>
                    <div class="form-group needs-validation">
                        <div class="col-sm-8 mx-auto">
                            <section v-show="errorShow">
                                <div class="alertBar error">
                                    <span title="error" class="alertBar-message">
                                    <i class="fa fa-exclamation-circle"></i>
                                    <span id="spnErrorNotification"></span>
                                    </span>
                                    <span class="alertBar-dismiss">
                                    <a class="cta"></a>
                                    </span>
                                </div>
                            </section>
                            <section v-show="successShow">
                                <div class="success_green">
                                    <span title="success" class="alertBar-message">
                                    <i class="fa fa-exclamation-circle"></i>
                                    <span id="successNotification"></span>
                                    </span>
                                    <span class="alertBar-dismiss">
                                    <a class="cta"></a>
                                    </span>
                                </div>
                            </section>
                        </div>
                        <div class="col-sm-8 mx-auto mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                                    </span>
                                </div>
                            <input
                                type="text"
                                id="nptEmail"
                                class="form-control"
                                placeholder="Correo"
                                required
                            />
                            </div>
                        </div>

                        <div class="col-sm-8 mx-auto mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                                    </span>
                                </div>
                            <input
                                type="text"
                                id="nptEmailConfirm"
                                class="form-control"
                                placeholder="Confirmar Correo"
                                required
                            />
                            </div>
                        </div>

                        <div class="col-sm-8 mx-auto mb-5">
                            <button class="btn btn-block" v-on:click="sendEmail">
                            Enviar Correo
                            </button>
                        </div>
                    </div>
                </div>
                
                

            </div>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    import App from "../../App.vue";
    export default{
        name:"askPasswordRecover",
        data(){
            return{
                errorShow:false,
                successShow:false,
            }   
        },
        methods:{
            sendEmail(){
                var email = document.getElementById("nptEmail").value;
                var emailConfirmation = document.getElementById("nptEmailConfirm").value;
                if(email==emailConfirmation){
                    axios
                    .get(App.methods.getBackUrl() + "/auth/emailToChangePassword?email="+email)
                    .then((response)=>{
                        console.log(response);
                        this.$data.successShow=true;
                        this.successFunction("Revise su correo");
                    })
                    
                }else{
                    this.errorFunction("Los correos son distintos");
                }
            },
            errorFunction(messageText) {
                let errorNotification = document.getElementById("spnErrorNotification");
                errorNotification.innerHTML = messageText;
                this.$data.errorShow = true;
                setTimeout(() => {
                    this.$data.errorShow = false;
                }, 5000);
            },
            successFunction(messageText) {
                let errorNotification = document.getElementById("successNotification");
                errorNotification.innerHTML = messageText;
                setTimeout(() => {
                    this.$data.successShow = false;
                }, 5000);
            },
        }
    }
</script>

<style>
    .success_green {
    color: #339933;
    }
</style>