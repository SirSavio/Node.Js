<template>
    <div class="app">
        <div class="container">
            <h1 class="mb-5">Vuekedex</h1>
            <input type="text" class="form-control mb-5 w-100 d-inline-block rounded" name="busca" placeholder="Buscar Pokemon" v-model="busca">
            <div class="row">
                <div
                    v-for="(poke, index) in resultadoBusca"
                    :key="poke.url"
                    class="col-12 col-sm-6 col-lg-4">
                    <Pokemon
                        :name="poke.name"
                        :num="index + 1"
                        :url="poke.url"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Pokemon from "./components/Pokemon";

export default {
    name: "App",
    created: function () {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
            .then((response) => {
                this.pokemon = response.data.results;
                console.log(this.pokemon);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    data() {
        return {
            pokemon: [],
            busca: ''
        };
    },
    components: {
        Pokemon,
    },
    computed: {
        resultadoBusca: function(){
            if(!this.busca.length) return this.pokemon
            else return this.pokemon.filter(poke => (poke.name.toLowerCase()).includes(this.busca.toLowerCase()))
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
