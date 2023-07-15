package com.inyoungserver.react.util;


import java.io.File;

import com.inyoungserver.react.security.SftpConfig;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;


public class SftpUploader {

    public static void uploadImageToSftp(File file, String fileName) throws Exception{
        System.out.println("sftp execute");
        JSch jsch = new JSch();
        Session jschSession = jsch.getSession(SftpConfig.USERNAME, SftpConfig.HOST, SftpConfig.PORT);
        jschSession.setPassword(SftpConfig.PASSWORD);
        jschSession.setConfig("StrictHostKeyChecking", "no");
        jschSession.connect();

        ChannelSftp channelSftp = (ChannelSftp) jschSession.openChannel("sftp");
        channelSftp.connect();

        channelSftp.cd(SftpConfig.DESTINATION_DIRECTORY);
        channelSftp.put(file.getAbsolutePath(), fileName);

        System.out.println("sftp end");
        channelSftp.disconnect();
        jschSession.disconnect();
    }
}
