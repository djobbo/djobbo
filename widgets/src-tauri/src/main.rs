#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{WindowBuilder};

// "windows": [
//     {
//         "title": "widgets",
//         "fullscreen": true,
//         "resizable": false,
//         "alwaysOnTop": true,
//         "transparent": true
//     }
// ]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()   
        .setup(|app| {
            let bar = WindowBuilder::new(app, "bar", tauri::WindowUrl::App("index.html".into()))
                .resizable(false)
                .fullscreen(true)
                .transparent(true)
                .always_on_top(true)
                .build()
                .unwrap();
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
