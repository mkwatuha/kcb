package org.kccb.dao;

import org.kccb.model.Contact;

import java.util.List;

/**
 *  The core interface for the Contact DAO
 */
public interface ContactDao {

    public Contact findById(Integer id);

    public List<Contact> searchForContact(String criteria);

    public List<Contact> searchForContactByPf(String phone_number);

    public List<Contact> listAll();

    public Contact updateContact(Contact contact);

    public void deleteContact(Integer id);

    public Contact addContact(Contact contact);
}
