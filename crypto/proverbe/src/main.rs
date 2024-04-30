use rand::seq::SliceRandom;
use std::fs::File;
use std::io::Write;

fn main() -> std::io::Result<()> {
    let flag: &str = "///CENSURÉ///";
    let output: String = flag.chars().into_iter().map(|c| c as u8).map(|mut b| {
        let mut s: Vec<char> = Vec::new();
        while b > 0 {
            s.push(encode(b));
            b -= decode(encode(b));
        }
        s.shuffle(&mut rand::thread_rng());
        s.push('.');
        s.into_iter().collect::<String>()
     }).collect::<Vec<_>>().join("");
     let mut file = File::create("rire.txt")?;
     file.write_all(output.as_bytes())?;
     Ok(())
}

pub fn encode(
    num: u8
) -> char {
    match num {
        50.. => 'h',
        10..=49 => '0',
        5..=9 => '!',
        1..=4 => '-',
        _ => panic!()
    }
}

pub fn decode(
    char: char
) -> u8 {
    match char {
        'h' => 50,
        '0' => 10,
        '!' => 5,
        '-' => 1,
        _ => panic!()
    }
}