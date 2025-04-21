const body = document.querySelector("body");
body.style.backgroundColor = "#f5f5dc";

const header = document.querySelector("header");
header.style.width = "100vw";
header.style.height = "150px";
header.style.backgroundColor = "#d2b48c";
header.style.color = "white";
header.style.margin = "0";
header.style.padding = "0";
header.style.position = "relative";
header.style.top = "0";
header.style.left = "0";
header.style.display = "flex";
header.style.alignItems = "center";
header.style.paddingLeft = "20px";


const menuHeadingContainer = document.querySelector("#menyoverskrift");
menuHeadingContainer.style.display = "flex";
menuHeadingContainer.style.justifyContent = "center";
menuHeadingContainer.style.marginTop = "40px";

const menyoverskrift = document.querySelector("h2");
menyoverskrift.style.textAlign = "center";
menyoverskrift.style.color = "#333";
menyoverskrift.style.fontSize = "30px";
menyoverskrift.style.zIndex = "1";

const MenyContainer = document.querySelector("#Meny");
MenyContainer.style.display = "flex";
MenyContainer.style.flexDirection = "row";
MenyContainer.style.flexWrap = "wrap";
MenyContainer.style.justifyContent = "space-around";
MenyContainer.style.alignItems = "flex-start";
MenyContainer.style.minHeight = "50vh";
MenyContainer.style.width = "80%";
MenyContainer.style.backgroundColor = "#e6c7a1";
MenyContainer.style.margin = "20px auto";
MenyContainer.style.padding = "30px";
MenyContainer.style.borderRadius = "8px";
MenyContainer.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

let cart = [];

const cartContainer = document.createElement("div");
cartContainer.id = "cart-container";
cartContainer.style.width = "80%";
cartContainer.style.margin = "20px auto";
cartContainer.style.padding = "20px";
cartContainer.style.backgroundColor = "#f0e0c0";
cartContainer.style.borderRadius = "8px";
cartContainer.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

const cartTitle = document.createElement("h3");
cartTitle.textContent = "Din handlekurv";
cartTitle.style.color = "#333";
cartTitle.style.borderBottom = "2px solid #8B4513";
cartTitle.style.paddingBottom = "10px";

const cartItemsList = document.createElement("ul");
cartItemsList.id = "cart-items";
cartItemsList.style.listStyleType = "none";
cartItemsList.style.padding = "0";

const cartTotal = document.createElement("div");
cartTotal.id = "cart-total";
cartTotal.style.fontWeight = "bold";
cartTotal.style.marginTop = "15px";
cartTotal.style.fontSize = "18px";
cartTotal.style.textAlign = "right";
cartTotal.textContent = "Totalt: 0.00 kr";

const payButton = document.createElement("button");
payButton.textContent = "Betal";
payButton.style.backgroundColor = "#8B4513";
payButton.style.color = "white";
payButton.style.border = "none";
payButton.style.padding = "10px 20px";
payButton.style.borderRadius = "5px";
payButton.style.marginTop = "15px";
payButton.style.cursor = "pointer";
payButton.style.fontSize = "16px";
payButton.style.display = "block";
payButton.style.marginLeft = "auto";
payButton.disabled = true;

cartContainer.appendChild(cartTitle);
cartContainer.appendChild(cartItemsList);
cartContainer.appendChild(cartTotal);
cartContainer.appendChild(payButton);

const successMessage = document.getElementById('success-message');

function addToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.navn === item.navn && 
        cartItem.pris === item.pris
    );
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartUI();
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    
    updateCartUI();
}

function updateCartUI() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.style.display = "flex";
        cartItem.style.justifyContent = "space-between";
        cartItem.style.alignItems = "center";
        cartItem.style.padding = "10px 0";
        cartItem.style.borderBottom = "1px solid #d2b48c";
        
        const itemInfo = document.createElement("div");
        itemInfo.style.flex = "1";
        
        const itemName = document.createElement("span");
        itemName.textContent = item.navn;
        itemName.style.fontWeight = "bold";
        
        const itemQuantity = document.createElement("span");
        itemQuantity.textContent = ` x${item.quantity}`;
        
        const itemPrice = document.createElement("span");
        const priceValue = parseFloat(item.pris.replace(/[^0-9.]/g, ''));
        const itemTotal = priceValue * item.quantity;
        itemPrice.textContent = `${itemTotal.toFixed(2)} kr`;
        itemPrice.style.marginLeft = "15px";
        
        totalPrice += itemTotal;
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "−";
        removeBtn.style.backgroundColor = "#d2b48c";
        removeBtn.style.color = "white";
        removeBtn.style.border = "none";
        removeBtn.style.borderRadius = "50%";
        removeBtn.style.width = "25px";
        removeBtn.style.height = "25px";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.marginRight = "10px";
        removeBtn.onclick = () => removeFromCart(index);
        
        const addBtn = document.createElement("button");
        addBtn.textContent = "+";
        addBtn.style.backgroundColor = "#8B4513";
        addBtn.style.color = "white";
        addBtn.style.border = "none";
        addBtn.style.borderRadius = "50%";
        addBtn.style.width = "25px";
        addBtn.style.height = "25px";
        addBtn.style.cursor = "pointer";
        addBtn.onclick = () => addToCart(item);
        
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemQuantity);
        itemInfo.appendChild(itemPrice);
        
        cartItem.appendChild(removeBtn);
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(addBtn);
        
        cartItemsList.appendChild(cartItem);
    });
    
    cartTotal.textContent = `Totalt: ${totalPrice.toFixed(2)} kr`;
    payButton.disabled = cart.length === 0;
}

payButton.addEventListener('click', function() {
    const successMsg = document.getElementById('success-message');
    successMsg.style.display = 'block';
    setTimeout(() => {
        successMsg.style.display = 'none';
        cart = [];
        updateCartUI();
    }, 3000);
});

function createCategorySection(category) {
    const categorySection = document.createElement("div");
    categorySection.className = "category-section";
    categorySection.style.width = "45%";
    categorySection.style.minWidth = "300px";
    categorySection.style.margin = "10px";
    categorySection.style.padding = "15px";
    categorySection.style.backgroundColor = "rgba(255,255,255,0.2)";
    categorySection.style.borderRadius = "5px";
    
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category.navn;
    categoryTitle.style.color = "#333";
    categoryTitle.style.fontSize = "24px";
    categoryTitle.style.textAlign = "center";
    categoryTitle.style.marginBottom = "20px";
    categoryTitle.style.borderBottom = "2px solid #333";
    categoryTitle.style.paddingBottom = "10px";
    
    categorySection.appendChild(categoryTitle);
    
    const itemsList = document.createElement("ul");
    itemsList.style.listStyleType = "none";
    itemsList.style.padding = "0";
    itemsList.style.margin = "0";
    
    category.varer.forEach(item => {
        const menuItem = document.createElement("li");
        menuItem.style.marginBottom = "15px";
        menuItem.style.padding = "10px";
        menuItem.style.borderBottom = "1px dotted #8B4513";
        menuItem.style.position = "relative";
        
        const itemHeader = document.createElement("div");
        itemHeader.style.display = "flex";
        itemHeader.style.justifyContent = "space-between";
        itemHeader.style.marginBottom = "5px";
        
        const itemName = document.createElement("span");
        itemName.textContent = item.navn;
        itemName.style.fontWeight = "bold";
        
        const itemPrice = document.createElement("span");
        itemPrice.textContent = item.pris;
        itemPrice.style.color = "#8B4513";
        
        itemHeader.appendChild(itemName);
        itemHeader.appendChild(itemPrice);
        
        const itemDescription = document.createElement("div");
        itemDescription.textContent = item.beskrivelse;
        itemDescription.style.fontSize = "0.9em";
        itemDescription.style.fontStyle = "italic";
        itemDescription.style.color = "#555";
        itemDescription.style.marginBottom = "10px";
        
        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Legg til";
        addToCartBtn.style.backgroundColor = "#8B4513";
        addToCartBtn.style.color = "white";
        addToCartBtn.style.border = "none";
        addToCartBtn.style.padding = "5px 10px";
        addToCartBtn.style.borderRadius = "3px";
        addToCartBtn.style.cursor = "pointer";
        addToCartBtn.style.fontSize = "14px";
        addToCartBtn.style.display = "block";
        addToCartBtn.style.marginLeft = "auto";
        
        addToCartBtn.addEventListener('click', () => addToCart(item));
        
        menuItem.appendChild(itemHeader);
        menuItem.appendChild(itemDescription);
        menuItem.appendChild(addToCartBtn);
        itemsList.appendChild(menuItem);
    });
    
    categorySection.appendChild(itemsList);
    return categorySection;
}

function loadMenuData(data) {
    try {
        while (MenyContainer.firstChild) {
            MenyContainer.removeChild(MenyContainer.firstChild);
        }
        
        data.meny.kategorier.forEach(category => {
            const categorySection = createCategorySection(category);
            MenyContainer.appendChild(categorySection);
        });
        
        applyResponsiveStyling();
        
    } catch (error) {
        console.error("Error creating menu:", error);
        const errorMsg = document.createElement("div");
        errorMsg.textContent = "Kunne ikke laste menyen. Vennligst prøv igjen senere.";
        errorMsg.style.color = "red";
        errorMsg.style.padding = "20px";
        errorMsg.style.textAlign = "center";
        MenyContainer.appendChild(errorMsg);
    }
}

function fetchMenuData() {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Laster meny...";
    loadingIndicator.style.textAlign = "center";
    loadingIndicator.style.padding = "20px";
    MenyContainer.appendChild(loadingIndicator);
    
    fetch('../json/meny.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Kunne ikke hente menydataene. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            MenyContainer.removeChild(loadingIndicator);
            loadMenuData(data);
            MenyContainer.parentNode.insertBefore(cartContainer, MenyContainer.nextSibling);
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
            if (loadingIndicator.parentNode === MenyContainer) {
                MenyContainer.removeChild(loadingIndicator);
            }
            const errorMsg = document.createElement("div");
            errorMsg.textContent = "Kunne ikke laste menyen. Vennligst prøv igjen senere.";
            errorMsg.style.color = "red";
            errorMsg.style.padding = "20px";
            errorMsg.style.textAlign = "center";
            MenyContainer.appendChild(errorMsg);
        });
}

function applyResponsiveStyling() {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth <= 576) {
        header.style.height = "100px";
        header.style.paddingLeft = "10px";
        
        const mainTitle = document.querySelector("header h1");
        if (mainTitle) {
            mainTitle.style.fontSize = "24px";
        }
        
        menyoverskrift.style.fontSize = "24px";
        menuHeadingContainer.style.marginTop = "20px";
        
        MenyContainer.style.width = "95%";
        MenyContainer.style.padding = "15px";
        
        const categorySections = document.querySelectorAll('.category-section');
        categorySections.forEach(section => {
            section.style.width = "100%";
            section.style.minWidth = "unset";
            section.style.margin = "10px 0";
            section.style.padding = "10px";
        });
        
        const categoryTitles = document.querySelectorAll('.category-section h3');
        categoryTitles.forEach(title => {
            title.style.fontSize = "20px";
            title.style.marginBottom = "15px";
        });
        
        const menuItems = document.querySelectorAll('.category-section li');
        menuItems.forEach(item => {
            item.style.padding = "8px 5px";
        });
        
        cartContainer.style.width = "95%";
        cartContainer.style.padding = "15px";
        
        cartTitle.style.fontSize = "20px";
        
        const cartItems = document.querySelectorAll('#cart-items li');
        cartItems.forEach(item => {
            const spans = item.querySelectorAll('span');
            spans.forEach(span => {
                span.style.fontSize = "14px";
            });
        });
        
        payButton.style.width = "100%";
        payButton.style.marginTop = "10px";
        
        successMessage.style.width = "80%";
        successMessage.style.padding = "15px";
    } else if (viewportWidth < 768) {
        const categorySections = document.querySelectorAll('.category-section');
        categorySections.forEach(section => {
            section.style.width = "90%";
            section.style.minWidth = "unset";
        });
        
        MenyContainer.style.width = "90%";
        cartContainer.style.width = "90%";
    } else {
        const categorySections = document.querySelectorAll('.category-section');
        categorySections.forEach(section => {
            section.style.width = "45%";
            section.style.minWidth = "300px";
        });
        
        MenyContainer.style.width = "80%";
        cartContainer.style.width = "80%";
        
        header.style.height = "150px";
        header.style.paddingLeft = "20px";
        
        const mainTitle = document.querySelector("header h1");
        if (mainTitle) {
            mainTitle.style.fontSize = "initial";
        }
        
        menyoverskrift.style.fontSize = "30px";
        menuHeadingContainer.style.marginTop = "40px";
    }
}

window.addEventListener('resize', applyResponsiveStyling);
window.addEventListener('load', applyResponsiveStyling);
fetchMenuData();
