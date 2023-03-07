const orders = [
    {
        id_order: "order_3",
        dateOrder: "12.02.2023",
        order_number: 2566857,
        totalCost: 67998,
        products: [
            {
            id_product: "order_3_29999",
            comment: "gift item, please pack nicely",
            name: "Samsung Galaxy S22",
            diagonal: 6.1,
            price: 29999,
            color: "Green",
            memory: "128GB/8GB",
            processor: "Android",
            main_images: './images/phones/samsung1.jpg',
            image_arr: ['./images/phones/samsung1.jpg', './images/phones/samsung1.1.jpg', './images/phones/samsung1.2.jpg'],
            availability : 4,
            sum: 29999,
            value: 1,
            },
            {
            id_product: "order_3_37999",
            name: "ASUS TUF Gaming A15",
            comment: "gift item, please pack nicely",
            diagonal: 15.6,
            price: 37999,
            color: "Black",
            processor: "Six-core processor AMD Rizen 3",
            OS: "without OS",
            memory: "512GB/16GB",
            sum: 37999,
            value: 1,
            main_images:'./images/salesData/saleLaptops/asus1.jpg',
            image_arr: ['./images/salesData/saleLaptops/asus1.jpg', './images/salesData/saleLaptops/asus1.1.jpg', './images/salesData/saleLaptops/asus1.2.jpg'],
            }
        ],
        contacts: [
			{
				name: 'Tetiana Tsehychko',
				eMail: 'tanchikqp@gmail.com',
				phoneNumber: '+380502226655',
				country: 'Ukraine',
				city: 'Kyiv',
				street: 'Shevchenka',
				house: '101',
			}
		]
    },
    {
        id_order: "order_2",
        dateOrder: "01.02.2023",
        order_number: 2564554,
        totalCost: 35999,
        products: [
            {
            id_product: "order_2_35999",
            comment: "gift item, please pack nicely",
            name: "Apple iPhone 13",
            diagonal: 6.1,
            price: 35999,
            color: "Blue",
            memory: "128GB",
            processor: "iOS",
            main_images: './images/phones/apple1.jpg',
            image_arr: ['./images/phones/apple1.jpg', './images/phones/apple1.1.jpg', './images/phones/apple1.2.jpg'],
            availability : 0,
            sum: 35999,
            value: 1,
            }
        ],
        contacts: [
			{
				name: 'Tetiana Tsehychko',
				eMail: 'tanchikqp@gmail.com',
				phoneNumber: '+380502226655',
				country: 'Ukraine',
				city: 'Kyiv',
				street: 'Shevchenka',
				house: '101',
			}
		]
    },
    {
        id_order: "order_1",
        dateOrder: "01.10.2022",
        order_number: 2561259,
        totalCost: 48888,
        products: [
            {
            id_product: "order_1_48888",
            comment: "gift item, please pack nicely",
            name: "Lenovo IdeaPad 5 Pro 16ACH6",
            diagonal: 16.0,
            price: 48888,
            color: "Gray",
            processor: "AMD Ryzen 7 5800H ",
            OS: "Windows 10 Pro",
            memory: "512GB/16GB",
            main_images:'./images/laptops/lenovo2.jpg',
            image_arr: ['./images/laptops/lenovo2.jpg', './images/laptops/lenovo2.1.jpg', './images/laptops/lenovo2.2.jpg'],
            availability : 4,
            sum: 48888,
            value: 1,
            }
        ],
        contacts: [
			{
				name: 'Tetiana Tsehychko',
				eMail: 'tanchikqp@gmail.com',
				phoneNumber: '+380502226655',
				country: 'Ukraine',
				city: 'Kyiv',
				street: 'Shevchenka',
				house: '101',
			}
		]
    }
]

export default orders;