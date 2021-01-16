<template>
    <div class="card mb-3">
        <div class="card-header bg-dark text-white">
            <img :id="'img' + pokemon.id" :src="pokemon.spritFront" @mouseenter="changeSprit(0)" @mouseleave="changeSprit(1)">
            {{ pokemon.id + ". " + upper(name) }}
        </div>
        <div :id="num">{{ pokemon.type }}</div>
        <div class="card-body">
            <div class="row">
                <h6 class="col-12 text-center" align="left">Habilidades</h6>
                <div class="col-6 text-capitalize text-weight-bold">
                    {{pokemon.abilities[0]}}
                </div>
                <div v-if="pokemon.abilities[1]" class="col-6 text-capitalize">
                    {{pokemon.abilities[1]}}
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: {
        num: Number,
        name: String,
        url: String,
    },
    methods: {
        upper: function (value) {
            return value[0].toUpperCase() + value.slice(1);
        },
        changeSprit: function(value){
            if(!value) document.getElementById('img' + this.pokemon.id).src = this.pokemon.spritBack
            else document.getElementById('img' + this.pokemon.id).src = this.pokemon.spritFront
        },
        processAbility(abilityName){
            return abilityName.replace('-', ' ')
        }
    },
    created: function () {
        axios
            .get(this.url)
            .then((response) => {
                console.log(response)
                this.pokemon.type = response.data.types[0].type.name;
                this.pokemon.spritFront = response.data.sprites.front_default;
                this.pokemon.spritBack = response.data.sprites.back_default;
                this.pokemon.id = response.data.id
                this.pokemon.weight = response.data.weight
                this.pokemon.abilities = [response.data.abilities[0].ability.name]

                if(response.data.abilities.length > 1){
                    this.pokemon.abilities.push(response.data.abilities[1].ability.name)
                }

                let objPkType = document.getElementById(this.num);
                switch (this.pokemon.type) {
                    case "grass":
                        objPkType.classList.add("bg-success", "text-white");
                        break;
                    case "fire":
                        objPkType.classList.add("bg-danger", "text-white");
                        break;
                    case "water":
                        objPkType.classList.add("bg-primary", "text-white");
                        break;
                    case "bug":
                        objPkType.classList.add("bg-success", "text-white");
                        break;
                    case "normal":
                        objPkType.classList.add("bg-grey", "text-white");
                        break;
                    case "poison":
                        objPkType.classList.add("bg-purple", "text-white");
                        break;
                    case "electric":
                        objPkType.classList.add("bg-warning", "text-white");
                        break;
                    case "ground":
                        objPkType.classList.add("bg-brown", "text-white");
                        break;
                    case "fairy":
                        objPkType.classList.add("bg-pink", "text-white");
                        break;
                    case "fighting":
                        objPkType.classList.add("bg-red", "text-white");
                        break;
                    case "psychic":
                        objPkType.classList.add("bg-pink", "text-white");
                        break;
                    case "rock":
                        objPkType.classList.add("bg-brown-dark", "text-white");
                        break;
                    case "ghost":
                        objPkType.classList.add("bg-dark-dark", "text-white");
                        break;
                    case "ice":
                        objPkType.classList.add("bg-info", "text-white");
                        break;
                    case "dragon":
                        objPkType.classList.add("bg-primary", "text-white");
                        break;
                    default:
                        break;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    data() {
        return {
            pokemon: {
                abilities: [],
                type: ''
            },
        };
    },
};
</script>

<style>
.bg-purple {
    background-color: blueviolet;
}
.bg-brown {
    background-color: rgb(109, 92, 70);
}
.bg-pink {
    background-color: pink;
}
.bg-red {
    background-color: red;
}
.bg-brown-dark {
    background-color: rgb(39, 35, 30);
}
.bg-dark-dark {
    background-color: rgb(0, 0, 0);
}
.bg-grey {
    background-color: rgb(167, 167, 167);
}
</style>