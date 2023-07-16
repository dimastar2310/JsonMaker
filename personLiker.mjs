

export default class Liker{

 #facebok_id;
 #full_name;
 #email
constructor(facebook_id =0,full_name="j",email="p"){
    this.#facebok_id = facebook_id;
    this.#full_name = full_name;
    this.#email = email;
    
}

toString() {
    return JSON.stringify({
      facebook_id: this.#facebok_id,
      full_name: this.#full_name,
      email: this.#email,
    });
  }


}