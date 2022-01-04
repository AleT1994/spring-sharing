package com.caronte.sharing.util;

import javax.persistence.AttributeConverter;

import com.caronte.sharing.entities.Posizione;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PosizioneJsonConverter implements AttributeConverter<Posizione, String>{

	@Override
	public String convertToDatabaseColumn(Posizione attribute) {
		  if(attribute == null)
	            return null;
		  
	        ObjectMapper mapper = new ObjectMapper();
	        
	        try {
				return mapper.writeValueAsString(attribute);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			return null;
	}

	@Override
	public Posizione convertToEntityAttribute(String DBData) {
		   if(DBData == null)
	            return null;

	        ObjectMapper mapper = new ObjectMapper();

	        try {
				return mapper.readValue(DBData, Posizione.class);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
			return null;
	}
}
