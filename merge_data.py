import pandas as pd

# List of your turtle tracking files and their species names
files = {
    "turtles-exploring-data-tracking-turtle-movements_montebellos-green-turtle.csv": "Green",
    "turtles-exploring-data-tracking-turtle-movements_cape-domett.csv": "Flatback",
    "turtles-exploring-data-tracking-turtle-movements_ningaloo-loggerhead.csv": "Loggerhead",
    "turtles-exploring-data-tracking-turtle-movements_rosemary-island-hawksbill.csv": "Hawksbill"
}

# Empty list to collect dataframes
dfs = []

# Read each file and add a 'species' column
for file, species in files.items():
    df = pd.read_csv(file)
    df["species"] = species
    dfs.append(df)

# Combine all into one dataframe
merged = pd.concat(dfs, ignore_index=True)

# Save to one CSV
merged.to_csv("turtles.csv", index=False)

print("✅ turtles.csv created successfully")
