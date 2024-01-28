
const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
let errorName = document.getElementById('errorName');
let errorPrice = document.getElementById('errorPrice');
// tạo mảng products để chứa danh sách product (API) hứng từ json server
let products = [];
function getProduct(){
    fetch('http://localhost:3000/products').then(response => response.json()).then(data => {
        products = data;
        displayProduct(); // Hàm innerHTML 
        // dự liệu json server sẽ trả về là 1 cục data
    }).catch(error => console.error())
}
function displayProduct(){
    productList.innerHTML = `
    <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Thao tác</th>
    </tr>
    
        ${products.map(product=>`
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                <button class="edit-btn" data-id="${product.id}">Edit</button>
                <button class="delete-btn" data-id="${product.id}">Delete</button>
                </td>
            </tr>
        `).join('')}
    `;
}
function addProduct(event){
    event.preventDefault(); // Không bị load lại trang khi thêm
    let flag = false;
    if(productName.value == ""){
        errorName.innerText = "Bạn phải nhâp tên đầy đủ";
        flag = true;
    }
    if(productPrice.value == ""){
        errorPrice.innerText = "Bạn phải nhâp giá đầy đủ";
        flag = true;
    }
    if(!flag){
        // tạo ra 1 object product đã thêm mới vào
        const product = {
            name: productName.value,
            price: productPrice.value
        };
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product) // ep về chuỗi JSON để nhồi dự vào trong product
        }).then(response => response.json()).then(data => {
            products.push(data)// đẩy dữ liệu mới vào mảng product
            displayProduct();
        }).catch(error => console.error(error) )
    }

}
productForm.addEventListener('submit', event=>{
    addProduct(event);
});
getProduct();