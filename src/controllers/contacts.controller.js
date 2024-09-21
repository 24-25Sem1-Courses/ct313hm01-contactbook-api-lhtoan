const contactService = require('../services/contacts.service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function createContact(req, res, next) {
    if(!req.body?.name || typeof req.body.name !== 'string') {
        return next(new ApiError(400, 'Name should be a non-empty string'));
    }

    try {
        const contact = await contactService.createContact({
            ...req.body,
            avatar: req.file ? `/public/uploads/${req.file.filename}` : null,
        });
        return res
            .status(200)
            .set({
                Location: `${req.baseUrl}/${contact.id}`,
            })
            .json(
                JSend.success({
                    contact,
                })
            );
    } catch (error) {
        return next(
            new ApiError(500, 'An error occurred while creating the contact')
        ); 
    }
}

async function getContactsByFilter(req, res, next) {
    let result = {
        contacts: [],
        metadata: {
            totalRecords: 0,
            firstPage: 1,
            lastPage: 1,
            page: 1,
            limit: 5,
        },
    };

    try {
        result = await contactService.getManyContacts(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        );
    }
    return res.json(
        JSend.success({
            contacts: result.contacts,
            metadata: result.metadata,
        })
    );
}

async function getContact(req, res, next) {
    const {id} = req.params;

    try {
        const contact = await contactService.getContactById(id);
        if(!contact) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.json(
            JSend.success({
                contact,
            })
        );
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving contact with id=${id}`)
        );
    }
}
async function updateContact(req, res, next) {
    if(Object.keys(req.body).length == 0 && !req.file){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    const {id} = req.params;

    try{
        const update = await contactService.updateContact(id, {
            ...req.body,
            avatar: req.file ? `/public/uploads/${req.file.filename}` : null,
        });
        if(!update){
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.json(
            JSend.success({
                contact: update,
            })
        );
    } catch (error){
        console.log(error);
        return next(
            new ApiError(500, `Error updating contact with id=${id}`)
        );
    }
}
async function deleteContact(req, res, next) {
    const {id} = req.params;

    try {
        const deleted = await contactService.deleteContact(id);
        if(!deleted){
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.json(JSend.success());
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Could not delete contact with id=${id}`)
        );
    } 
}
async function deleteAllContacts(req, res, next) {
    try {
        await contactService.deleteAllContacts();
        return res.json(JSend.success());
    } catch (error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while removing all contacts')
        );
    }
}

module.exports = {
    getContactsByFilter,
    deleteAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
};
