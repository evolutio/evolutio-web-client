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
}

export default {
    model,
    show,
}