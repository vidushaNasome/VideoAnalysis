const apiBaseUrl = "http://127.0.0.1:8000/";
//const authStoreKey = "@bookStore";

// APIs

//Categories Management
const categoriesAPI = `${apiBaseUrl}VideoAnalysis/Categories/`;
const categoriesLevel2API = `${apiBaseUrl}VideoAnalysis/CategoriesTwo/`;
const categoriesLevel3API = `${apiBaseUrl}VideoAnalysis/CategoriesThree/`;

//Video Retrieving from Uploaded
//Upload Video Component
const videoRetrievefromUpload = `${apiBaseUrl}VideoAnalysis/uploadretrieve/`;

//Video Annotating
const createfolder = `${apiBaseUrl}VideoAnalysis/createfolder`;
const videoUpload = `${apiBaseUrl}VideoAnalysis/Videoupload/`;
const videoUploadLevelTwo = `${apiBaseUrl}VideoAnalysis/VideouploadLeveltwo/`;
const videoUploadLevelThree = `${apiBaseUrl}VideoAnalysis/Levelthreevideoupload/`;

const csaat_web=`https://CSAAT-WEB.com/`;


export{
    categoriesAPI,
    categoriesLevel2API,
    categoriesLevel3API,
    createfolder,
    videoRetrievefromUpload,
    videoUpload,
    videoUploadLevelTwo,
    videoUploadLevelThree,
    csaat_web,
}
