<template>
    <div>
        
        <head>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
            <!-- font awesome -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        </head>
        <body>
        <section>
            <div class="searchContainer">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                    <select class="form-control search-slt" required id="procedure-type" ref="procedureType">
                                        <option selected disabled value="">Procedimiento</option>
                                        <option value="Limpieza">Limpieza</option>
                                        <option value="Remoción de cordales">Remoción de cordales</option>
                                        <option value="Odontología Infantil">Odontología Infantil</option>
                                        <option value="Odontología General"></option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                    <button type="button" class="btn btn-danger wrn-btn" v-on:click="this.$root.$refs.PatientArea.searchProcedure()">Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
        
        
        </body>
    </div>

</template>

<script>
    export default{
    }
</script>

<style>
    .searchContainer {
        align-items: center;
        min-height: 100vh;
        margin-left: 100px;
    }
    .search-sec{
        padding: 2rem;
    }
    .search-slt{
        display: block;
        width: 100%;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: #fff;
        border: 1px solid #ccc;
        height: calc(3rem + 2px) !important;
        border-radius:0;
    }
    .wrn-btn{
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        text-transform: capitalize;
        height: calc(3rem + 2px) !important;
        border-radius:0;
    }
</style>