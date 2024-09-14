const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { methodNotAllowed } = require('../controllers/errors.controller'); 

const router = express.Router();
module.exports.setup = (app) => {
app.use('/api/v1/contacts', router);

/**
 * @swagger
 * /api/v1/contacts:
 *  get:
 *     summary: Get contacts by filter
 *     description: Get contacts by filter
 *     parameters:
 *        - in: query
 *          name: favorite
 *          schema:
 *              type: boolean
 *          description: Filter by favorite status
 *        - in: query
 *          name: name
 *          schema:
 *              type: string
 *          description: Filter by contact name
 *     tags:
 *        - contacts 
 *     responses:
 *          200:
 *              description: A list of contacts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The responses status
 *                                  enum: [success]
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      contacts:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/Contact'       
 */
router.get('/', contactsController.getContactsByFilter);

/**
 * @swagger
 * /api/v1/contacts:
 *  post:
 *     summary: Create a new contact
 *     description: Create a new contact
 *     requestBody:
 *          required: true
 *          content:
 *              multipart/from-data:
 *                  schema:
 *                       $ref: '#/components/schemas/Contact'  
 *     tags:
 *        - contacts 
 *     responses:
 *          201:
 *              description: A new contact
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The responses status
 *                                  enum: [success]
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      contacts:
 *                                          $ref: '#/components/schemas/Contact'       
 */
router.post('/', contactsController.createContact);

/**
 * @swagger
 * /api/v1/contacts:
 *  delete:
 *     summary: Delete all contacts
 *     description: Delete all contacts
 *     tags:
 *        - contacts 
 *     responses:
 *          200:
 *              description: All contact deleted
 *              $ref: '#/components/responses/200NoData'       
 */
router.delete('/', contactsController.deleteAllContacts);
router.all('/', methodNotAllowed);

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *  get:
 *     summary: Get contacts by ID
 *     description: Get contacts by ID
 *     parameters:
 *        - $ref: '#/components/parameters/contactIdParam'
 *     tags:
 *        - contacts 
 *     responses:
 *          200:
 *              description: A  contact
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The responses status
 *                                  enum: [success]
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      contacts:
 *                                          $ref: '#/components/schemas/Contact'       
 */
router.get('/:id', contactsController.getContact);

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *  put:
 *     summary: Update contacts by ID
 *     description: Update contacts by ID
 *     parameters:
 *        - $ref: '#/components/parameters/contactIdParam'
 *     requestBody:
 *          required: true
 *          content:
 *              multipart/from-data:
 *                  schema:
 *                       $ref: '#/components/schemas/Contact'
 *     tags:
 *        - contacts 
 *     responses:
 *          200:
 *              description: An updated contact
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The responses status
 *                                  enum: [success]
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      contacts:
 *                                          $ref: '#/components/schemas/Contact'       
 */
router.put('/:id', contactsController.updateContact);

/**
 * @swagger
 * /api/v1/contacts/{id}:
 *  delete:
 *     summary: Delete contacts by ID
 *     description: Delete contacts by ID
 *     parameters:
 *        - $ref: '#/components/parameters/contactIdParam'
 *     tags:
 *        - contacts 
 *     responses:
 *          200:
 *              description: A  contact
 *              $ref: '#/components/schemas/Contact'       
 */
router.delete('/:id', contactsController.deleteContact);
router.all('/:id', methodNotAllowed);
};