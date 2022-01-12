package com.caronte.sharing.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.caronte.sharing.config.CustomProperties;
import com.caronte.sharing.entities.Utente;
import com.caronte.sharing.repos.UtenteDAO;
import com.caronte.sharing.util.FileUploader;

@Service
public class UtenteServiceImpl implements UtenteService {

	@Autowired
	private UtenteDAO repoUtente;
	
	@Override
	public void addUtente(Utente utente) {
		utente.setRuolo("utente");
		this.repoUtente.save(utente);
	}
	
	@Override
	public void addImageUtente(MultipartFile multipartFile) {
		
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
		
		String uploadDir = CustomProperties.basepath + "/utenti";
		
		try {
	       	//5
				FileUploader.saveFile(uploadDir, fileName, multipartFile);
			} catch (IOException e) {
				e.printStackTrace();
			}
	}

	@Override
	public Utente getOne(String email) {
		return this.repoUtente.findByEmail(email);
	}

	@Override
	public List<Utente> getAll() {
		return this.repoUtente.findAll();
	}

	@Override
	public void updateUtente(Utente utente) {
		this.repoUtente.save(utente);
	}

	@Override
	public void deleteUtente(String email) {
		this.repoUtente.deleteByEmail(email);
	}

}
