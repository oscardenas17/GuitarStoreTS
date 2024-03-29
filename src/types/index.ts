export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
  };
  
  
  export type CartItem = Pick<Guitar, 'id'|'name'|'price' | 'image'>  & {
 
    quantity: number 
  };


  export type GuitarID = Guitar['id']

  //Omit, retira atributos
//   export type CartItem = Omit<Guitar, 'id'|'name'|'price'>  & {
 
//     quantity: number 
//   };
  
//   export type CartItem = Guitar & {
 
//     quantity: number 
//   };
  
  
