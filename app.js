import { recipes } from './recipes/recipes.js'

class Recipes{
    constructor(container, menuItems, searchInput, searchBtn){
        this.container = container
        this.menuItems = menuItems
        this.searchInput = searchInput
        this.searchBtn = searchBtn

        this.number = 0
        this.newRecipes = recipes
        this.init()
    }
    init(){
        this.menuCategory()
        this.createMenu()
        this.searchApp()
    }

    menuCategory = () => {
        this.menuItems.forEach(element => {
            element.addEventListener('click', e => {
                this.menuItems.forEach(item => {
                    const children = [...item.children]
                    children.forEach(child => {
                        child.style.backgroundColor = 'white'
                    })
                })
                this.number = 0
                this.newRecipes = []
                e.target.style.backgroundColor = 'royalblue'
                if(e.target.textContent === 'Vege'){
                    recipes.filter((item) => {
                        if(item.category === 'Vege'){
                            this.newRecipes.push(item)
                            this.container.innerHTML = ''
                        }
                    })
                }else if(e.target.textContent === 'Basic'){
                    recipes.filter((item) => {
                        if(item.category === 'Basic'){
                            this.newRecipes.push(item)
                            this.container.innerHTML = ''
                        }
                    })
                }else{
                    this.container.innerHTML = ''
                    this.newRecipes = recipes
                }
                return this.createMenu()
            })
        });
    }

    createMenu = () => {
        for(let i = 0; i < this.newRecipes.length; i++){
            this.container.innerHTML += `<div class="card col-11 col-lg-5 card-item" style="padding: 10px;${this.newRecipes[i].background};
            background-size: cover;">
                <div class="card-body d-flex flex-column" style="background-color: rgba(0, 0, 0, 0.7); letter-spacing: 1px;height: 100%">
                  <h5 class="card-title text-center h2 h1-xl p-1 p-md-3 text-light">${this.newRecipes[i].name}</h5>
                  <p class="card-text w-75 align-self-center h5 h4-xl text-light">${this.newRecipes[i].description}</p>
                  <ul class="list-group list-group-flush w-75 align-self-center mt-1 mb-3 mt-lg-3 mb-lg-4 flex-grow-1 item-container">
                  </ul>
                <button class="btn w-75 w-md-50 align-self-center btn-outline-light" style="height: 40px" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample">
                    preparation instructions
                </button>
                  <div class="collapse" id="collapseExample${i}">
                    <div class="card card-body position-absolute top-0 w-100 start-0" style="height: calc(100% - 80px);">
                    <ul class="list-group list-group-flush w-100 align-self-center mt-4 mb-4 flex-grow-1 preparation-container">
                    </ul>
                    </div>
                  </div>
                </div>
            </div>`
        }
        const ulList = document.querySelectorAll('.item-container')
        const prepContainer = document.querySelectorAll('.preparation-container')
        for(let i = 0; i < this.newRecipes.length; i++){
            for(let i = 0; i < this.newRecipes[this.number].ingredients.length; i++){
                ulList[this.number].innerHTML += `<li class="list-group-item p-0 bg-transparent text-light">- ${this.newRecipes[this.number].ingredients[i]}</li>`
            }
            for(let i = 0; i < this.newRecipes[this.number].preparation.length; i++){
                prepContainer[this.number].innerHTML += `<li class="list-group-item p-0 bg-transparent text-dark" style="font-size: 14px;">- ${this.newRecipes[this.number].preparation[i]}</li>`
            }
            this.number++   
        }
    }
    searchApp = () => {
        this.searchInput.addEventListener('input', e => {
            const cards = document.querySelectorAll('.card-item')
            const cardsTitle = [...document.querySelectorAll('.card-title')]
            cardsTitle.filter((item) => {
                if(item.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1){
                    item.parentElement.parentElement.style.display = 'block'
                }else{
                    item.parentElement.parentElement.style.display = 'none'
                }
            })
        })
    }
}
const recipesWeb = new Recipes(document.querySelector('.cards-container'), document.querySelectorAll('.menu-container li'), document.querySelector('.search-input'), document.querySelector('.search-btn'))