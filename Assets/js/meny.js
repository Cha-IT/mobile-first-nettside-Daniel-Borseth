const body = document.querySelector("body");
body.style.backgroundColor = "#f5f5dc";

body.style.overflowX = "hidden";
body.style.margin = "0";
body.style.padding = "0";
body.style.width = "100%";
body.style.boxSizing = "border-box";

const header = document.querySelector("header");

header.style.width = "100%";
header.style.height = "200px";
header.style.backgroundColor = "#d2b48c"; 
header.style.color = "white";
header.style.margin = "0";
header.style.padding = "0";
header.style.position = "relative";
header.style.top = "0";
header.style.left = "0";
header.style.boxSizing = "border-box";

const cafeTitle = document.querySelector("h1");
cafeTitle.style.left = "20px";
cafeTitle.style.position = "relative";
cafeTitle.style.top = "20px";

const menuHeadingContainer = document.querySelector("#menyoverskrift");
menuHeadingContainer.style.display = "flex";
menuHeadingContainer.style.justifyContent = "center";
menuHeadingContainer.style.marginTop = "40px";
menuHeadingContainer.style.width = "100%";
menuHeadingContainer.style.boxSizing = "border-box";

const menyoverskrift = document.querySelector("h2");
menyoverskrift.style.textAlign = "center";
menyoverskrift.style.color = "#333";
menyoverskrift.style.fontSize = "30px";
menyoverskrift.style.zIndex = "1";
menyoverskrift.style.width = "100%";
menyoverskrift.style.boxSizing = "border-box";

const MenyContainer = document.querySelector("#Meny");
MenyContainer.style.display = "flex";
MenyContainer.style.flexDirection = "row";
MenyContainer.style.flexWrap = "wrap";
MenyContainer.style.justifyContent = "space-around";
MenyContainer.style.alignItems = "flex-start";
MenyContainer.style.minHeight = "50vh";
MenyContainer.style.width = "80%";
MenyContainer.style.maxWidth = "100%";
MenyContainer.style.backgroundColor = "#e6c7a1";
MenyContainer.style.margin = "20px auto";
MenyContainer.style.padding = "30px";
MenyContainer.style.borderRadius = "8px";
MenyContainer.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
MenyContainer.style.boxSizing = "border-box";

const matSection = document.querySelector("#mat");
const drikkeSection = document.querySelector("#drikke");
if (matSection) matSection.remove();
if (drikkeSection) drikkeSection.remove();

function createCategorySection(category) {
    const categorySection = document.createElement("div");
    categorySection.className = "category-section";
    categorySection.style.boxSizing = "border-box";
    
    if (window.innerWidth <= 576) {
        categorySection.style.width = "100%";
        categorySection.style.minWidth = "unset";
        categorySection.style.margin = "10px 0";
    } else {
        categorySection.style.width = "40%";
        categorySection.style.minWidth = "300px";
        categorySection.style.margin = "10px";
    }
    
    categorySection.style.padding = "15px";
    categorySection.style.backgroundColor = "rgba(255,255,255,0.2)";
    categorySection.style.borderRadius = "5px";
    
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category.navn;
    categoryTitle.style.color = "#333";
    categoryTitle.style.boxSizing = "border-box";
    categoryTitle.style.width = "100%";
    categoryTitle.style.wordWrap = "break-word";

    if (window.innerWidth <= 576) {
        categoryTitle.style.fontSize = "20px";
    } else {
        categoryTitle.style.fontSize = "24px";
    }
    
    categoryTitle.style.textAlign = "center";
    categoryTitle.style.marginBottom = "20px";
    categoryTitle.style.borderBottom = "2px solid #333";
    categoryTitle.style.paddingBottom = "10px";
    
    categorySection.appendChild(categoryTitle);
    
    const itemsList = document.createElement("ul");
    itemsList.style.listStyleType = "none";
    itemsList.style.padding = "0";
    itemsList.style.margin = "0";
    itemsList.style.width = "100%";
    itemsList.style.boxSizing = "border-box";
    
    category.varer.forEach(item => {
        const menuItem = document.createElement("li");
        menuItem.style.marginBottom = "15px";
        menuItem.style.padding = "10px";
        menuItem.style.borderBottom = "1px dotted #8B4513";
        menuItem.style.boxSizing = "border-box";
        menuItem.style.width = "100%";
        
        const itemHeader = document.createElement("div");
        itemHeader.style.display = "flex";
        itemHeader.style.justifyContent = "space-between";
        itemHeader.style.marginBottom = "5px";
        itemHeader.style.width = "100%";
        itemHeader.style.boxSizing = "border-box";
        
        if (window.innerWidth <= 576) {
            itemHeader.style.flexWrap = "wrap";
        }
        
        const itemName = document.createElement("span");
        itemName.textContent = item.navn;
        itemName.style.fontWeight = "bold";
        itemName.style.wordWrap = "break-word";
        itemName.style.boxSizing = "border-box";
        
        if (window.innerWidth <= 576) {
            itemName.style.fontSize = "0.95rem";
            itemName.style.marginRight = "10px";
            itemName.style.flexGrow = "1";
        }
        
        const itemPrice = document.createElement("span");
        itemPrice.textContent = item.pris;
        itemPrice.style.color = "#8B4513";
        itemPrice.style.whiteSpace = "nowrap";
        
        if (window.innerWidth <= 576) {
            itemPrice.style.fontWeight = "bold";
        }
        
        itemHeader.appendChild(itemName);
        itemHeader.appendChild(itemPrice);
        
        const itemDescription = document.createElement("div");
        itemDescription.textContent = item.beskrivelse;
        itemDescription.style.width = "100%";
        itemDescription.style.wordWrap = "break-word";
        itemDescription.style.boxSizing = "border-box";
        
        if (window.innerWidth <= 576) {
            itemDescription.style.fontSize = "0.85em";
            itemDescription.style.marginTop = "5px";
        } else {
            itemDescription.style.fontSize = "0.9em";
        }
        
        itemDescription.style.fontStyle = "italic";
        itemDescription.style.color = "#555";
        
        menuItem.appendChild(itemHeader);
        menuItem.appendChild(itemDescription);
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
        
    } catch (error) {
        console.error("Error creating menu:", error);
        
        const errorMsg = document.createElement("div");
        errorMsg.textContent = "Kunne ikke laste menyen. Vennligst prøv igjen senere.";
        errorMsg.style.color = "red";
        errorMsg.style.padding = "20px";
        errorMsg.style.textAlign = "center";
        errorMsg.style.width = "100%";
        errorMsg.style.boxSizing = "border-box";
        MenyContainer.appendChild(errorMsg);
    }
}

function fetchMenuData() {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Laster meny...";
    loadingIndicator.style.textAlign = "center";
    loadingIndicator.style.padding = "20px";
    loadingIndicator.style.width = "100%";
    loadingIndicator.style.boxSizing = "border-box";
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
            errorMsg.style.width = "100%";
            errorMsg.style.boxSizing = "border-box";
            MenyContainer.appendChild(errorMsg);
        });
}

function applyMobileStyles() {
    
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(meta);
    }

    if (window.innerWidth <= 576) {
        header.style.height = "150px"; 
        
        cafeTitle.style.fontSize = "1.8rem";
        cafeTitle.style.left = "0";
        cafeTitle.style.top = "10px";
        cafeTitle.style.width = "100%";
        cafeTitle.style.textAlign = "center";
        
        MenyContainer.style.width = "95%";
        MenyContainer.style.padding = "15px";
        
        menyoverskrift.style.fontSize = "24px";
        menuHeadingContainer.style.marginTop = "20px";
    } else {
        header.style.height = "200px";
        
        cafeTitle.style.fontSize = "2rem"; 
        cafeTitle.style.left = "20px";
        cafeTitle.style.top = "20px";
        cafeTitle.style.width = "auto";
        cafeTitle.style.textAlign = "left";
        
        MenyContainer.style.width = "80%";
        MenyContainer.style.padding = "30px";
        
        menyoverskrift.style.fontSize = "30px";
        menuHeadingContainer.style.marginTop = "40px";
    }
    
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(section => {
        if (window.innerWidth <= 576) {
            section.style.width = "100%";
            section.style.minWidth = "unset";
            section.style.margin = "10px 0";
        } else {
            section.style.width = "45%";
            section.style.minWidth = "300px";
            section.style.margin = "10px";
        }
    });
}


applyMobileStyles();


window.addEventListener('resize', applyMobileStyles);

fetchMenuData();
