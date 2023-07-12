package com.inyoungserver.react.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.inyoungserver.react.util.SftpUploader;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @PostMapping("/api/upload")
    private ResponseEntity <ImageUploadResponse> uploadImage(@RequestParam("image") MultipartFile image) throws Exception{
        if(image.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        try{
            // 파일명을 고유 식별자로 생성
            String fileName = UUID.randomUUID().toString() + "-" + StringUtils.cleanPath(image.getOriginalFilename());

            File tempFile = File.createTempFile("temp-", "-" + fileName);
            image.transferTo(tempFile);
            
            SftpUploader.uploadImageToSftp(tempFile, fileName);

            String imageUrl = "https://apache.ioracle.cloud/blog/images/" + fileName;
            
            return ResponseEntity.ok(new ImageUploadResponse(imageUrl));
        }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private static class ImageUploadResponse{
        private final String url;

        public ImageUploadResponse(String url){
            this.url = url;
        }

        public String getUrl() {
            return url;
        }
    }

    

}
