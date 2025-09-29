package com.tictactoe.game;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.views.text.ReactFontManager;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class PackageList {
    private Application application;
    private MainReactPackage mMainReactPackage;
    private ReanimatedPackage mReanimatedPackage;
    private final ReactNativeHost reactNativeHost;

    public PackageList(ReactNativeHost reactNativeHost) {
        this.reactNativeHost = reactNativeHost;
        mMainReactPackage = new MainReactPackage();
        mReanimatedPackage = new ReanimatedPackage();
    }

    public PackageList(Application application) {
        this.reactNativeHost = null;
        this.application = application;
    }

    private Resources getResources() {
        return this.getApplication().getResources();
    }

    private Application getApplication() {
        return this.application;
    }

    public ArrayList<ReactPackage> getPackages() {
        return new ArrayList<>(Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReanimatedPackage()
        ));
    }
}
