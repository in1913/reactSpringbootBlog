package com.inyoungserver.react.util;


import java.io.File;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;


public class SftpUploader {
    private static final String HOST = "144.24.90.84";
    private static final int PORT = 2727;
    private static final String USERNAME = "inyoung";
    private static final String PASSWORD = "whoareyou1085!";
    private static final String DESTINATION_DIRECTORY = "/home/inyoung/docker/apache/html/blog/images";

    public static void uploadImageToSftp(File file, String fileName) throws Exception{
        System.out.println("sftp execute");
        JSch jsch = new JSch();
        Session jschSession = jsch.getSession(USERNAME, HOST, PORT);
        jschSession.setPassword(PASSWORD);
        jschSession.setConfig("StrictHostKeyChecking", "no");
        jschSession.connect();

        ChannelSftp channelSftp = (ChannelSftp) jschSession.openChannel("sftp");
        channelSftp.connect();

        channelSftp.cd(DESTINATION_DIRECTORY);
        channelSftp.put(file.getAbsolutePath(), fileName);

        System.out.println("sftp end");
        channelSftp.disconnect();
        jschSession.disconnect();
    }
}
