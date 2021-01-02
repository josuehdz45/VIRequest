/**
 * Respository: https://github.com/josuehdz45/VIRequest.git
 * @description A small library to validate and send data to a Rest API
 * @author josuehdz45 <josue.hernandez@vlim.com.mx>
 */
class VIRest {

    /**
     * Determina si el valor es un objecto y no es null
     * 
     * @param {Object} $data - Valor que se verificara
     * @returns {boolean} Retorna con un true si el valor es un objeto
     */
    isObject(data){
        return (data != null) && typeof data == "object";
    }

    /**
     * Determina si el valor en varametro es un FormData
     * 
     * @param {Object} data - Valor que sera verificado
     * @returns {boolean} Retorna con un true si el valor es un objeto
     */
    isFormData(data){
        return (typeof FormData !== 'undefined') && (data instanceof FormData);
    }

    /**
     * Verifica si el valor en parametro es un URL
     * 
     * @param {Object} data - Valor que sera verificado
     * @returns {boolean} Retorna con un true si el valor es un objeto
     */
    isURL(data) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(data);
    }

    /**
     * Init a new post request to api rest
     * 
     * @param {string} url - Debe contener el end point a donde se va a enviar el objecto
     * @param {Object} object - El contenido que se enviara al enpoint, puede ser cualquier tipo de dato
     * @param {Object} options - Debe contener los headers a enviar y de ser el caso el tipo de datos a retornar
     * @returns {Object} - Se retornara el tipo de dato que el enpoint retorne
     */
    post(url, content, options){
        try{
            return new Promise((resolve, reject) => {
                if(this.isURL(url)){
                    
                    fetch(url, {
                        body: JSON.stringify(content),
                        headers: (options.headers == null) ? {"Content-Type": "application/json"} : options.headers,
                        method: "POST"
                    }).then(data => {
                        return returnType(options.dataType, data);
                    }).then(response => {
                        resolve(response);
                    }).catch(err => {
                        reject(err);
                    });
                }
                else{
                    let error = "The url parameter is not a validate endpoint, make sure this parameter contains a URL";
                    reject(error);
                    throw error;
                }
            });
        }
        catch(err){
           console.error(err); 
        }
    }

    returnType(type, data){
        var result_covetion;
        switch (type) {
            case /^json/i:
                result_covetion = data.json();
                break;
            case /^formdata/i:
                result_covetion = data.formData();
                break;
            default:
                result_covetion = data.text();
                break;
        }
        return result_covetion;
    }
}

var virest = new VIRest();


var formdata = new FormData();
formdata.append("welcome", "hello world");



virest.post("http://services.historiasenpapeldigital.com/modelIntro", {
	model: 234
}, {
    dataType: "json"
}).then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});