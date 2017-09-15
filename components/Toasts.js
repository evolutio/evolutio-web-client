var model = {
    text: '',
    visible: false,
    timeout: 1000,
};

function show(text, options){
    options = options || {};
    model.text = text;
    Object.assign(model, options);
    model.visible = true;
    console.log('show toast');
}

export default {
    model,
    show,
}