package com.imjuni.jdbc;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.util.Formatter;
import java.util.Locale;

/**
 * Created by bjlee on 2015. 11. 9..
 */
public class JdbcWrapper {
    public static String staticGetHelloWorld () {
        return "Hello World";
    }

    public static void staticLongRunTask () {
        try {
            int len = 5;

            for (int i = 0; i < len; i++) {
                StringBuilder sb = new StringBuilder();
                Formatter formatter = new Formatter(sb, Locale.KOREAN);

                String filename = formatter.format("out_%d.txt", i).toString();

                BufferedWriter out = new BufferedWriter(new FileWriter(filename));

                out.write(formatter.format("Write, and Step: %d", i).toString());
                out.newLine();
                out.close();

                Thread.sleep(10 * 1000);
            }
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
    }

    public String longRunTask () {
        try {
            int len = 5;

            for (int i = 0; i < len; i++) {
                StringBuilder sb = new StringBuilder();
                Formatter formatter = new Formatter(sb, Locale.KOREAN);

                String filename = formatter.format("out_%d.txt", i).toString();

                BufferedWriter out = new BufferedWriter(new FileWriter(filename));

                out.write(formatter.format("Write, and Step: %d", i).toString());
                out.newLine();
                out.close();

                Thread.sleep(10 * 1000);
            }

            return "Long, Long";
        } catch (Exception err) {
            System.out.println(err.getMessage());

            return "Long, Long, fail";
        }
    }

    public String getHelloWorld () {
        return "Hello World";
    }
}
